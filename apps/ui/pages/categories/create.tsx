import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { CreateCategoryDto } from '@mixologic/common';

import { Button, CheckIcon, ErrorIcon, TextInput } from '../../components';

const resolver = classValidatorResolver(CreateCategoryDto);

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function CreateCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });
  const [shouldAnimateLoading, setShouldAnimateLoading] = useState(false);

  const mutation = useMutation<Response, Error, CreateCategoryDto>(
    async (createCategoryDto) => {
      const response = await fetch(`http://localhost:4200/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createCategoryDto), // body data type must match "Content-Type" header
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.message);
      }

      return response;
    }
  );

  useEffect(() => {
    if (mutation.isLoading) {
      setShouldAnimateLoading(true);
      setTimeout(() => {
        setShouldAnimateLoading(false);
      }, 500);
    }
  }, [mutation.isLoading]);

  const onSubmit = (createCategoryDto: CreateCategoryDto) =>
    mutation.mutate(createCategoryDto);

  return (
    <form
      className="w-full max-w-sm mx-auto px-5 py-10 bg-white rounded-lg shadow dark:bg-gray-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
        Category
      </div>
      <div className="grid max-w-xl grid-cols-2 gap-8 m-auto">
        <div className="col-span-2">
          <TextInput
            label="Name"
            defaultValue=""
            {...register('name')}
            required
            error={errors.name?.message}
          />
        </div>
        <div className="col-span-2 text-right">
          <Button
            submit={true}
            label="Save"
            color="indigo"
            isLoading={mutation.isLoading || shouldAnimateLoading}
            icon={<CheckIcon className="-ml-1 mr-1" />}
          />
        </div>
        {!shouldAnimateLoading && mutation.isSuccess ? (
          <div className="col-span-2">
            <CheckIcon className="-mt-1 mr-1 inline text-green-500" />
            Category saved
          </div>
        ) : !shouldAnimateLoading && mutation.isError ? (
          <div className="col-span-2">
            <p>
              <ErrorIcon className="mr-1 inline-block -mt-1" />
              An error occurred:
            </p>
            <p>{mutation.error.message}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
