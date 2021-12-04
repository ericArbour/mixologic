import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { CreateCategoryDto } from '@mixologic/common';

import {
  Button,
  CheckIcon,
  ErrorMessage,
  Form,
  FormBody,
  FormHeader,
  FormSection,
  SuccessMessage,
  TextInput,
} from '../../components';
import { useAnimateLoading } from '../../hooks';
import { submitMutation } from '../../utils';

const resolver = classValidatorResolver(CreateCategoryDto);

export default function CreateCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const mutation = useMutation<Response, Error, CreateCategoryDto>(
    (createCategoryDto) => submitMutation(createCategoryDto, 'categories')
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  const onSubmit = (createCategoryDto: CreateCategoryDto) =>
    mutation.mutate(createCategoryDto);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Create Category</FormHeader>
      <FormBody>
        <TextInput
          label="Name"
          defaultValue=""
          {...register('name')}
          required
          error={errors.name?.message}
        />
        <FormSection>
          <Button
            submit={true}
            label="Save"
            color="indigo"
            isLoading={mutation.isLoading || shouldAnimateLoading}
            icon={<CheckIcon className="-ml-1 mr-1" />}
          />
        </FormSection>
        {!shouldAnimateLoading && mutation.isSuccess ? (
          <SuccessMessage label="Category" />
        ) : !shouldAnimateLoading && mutation.isError ? (
          <ErrorMessage>{mutation.error.message}</ErrorMessage>
        ) : null}
      </FormBody>
    </Form>
  );
}
