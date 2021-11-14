import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { CreateUnitDto } from '@mixologic/common';

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

const resolver = classValidatorResolver(CreateUnitDto);

export default function CreateUnit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const mutation = useMutation<Response, Error, CreateUnitDto>(
    (createUnitDto) => submitMutation(createUnitDto, 'units')
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  const onSubmit = (createUnitDto: CreateUnitDto) =>
    mutation.mutate(createUnitDto);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Unit</FormHeader>
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
          {!shouldAnimateLoading && mutation.isSuccess ? (
            <SuccessMessage label="Unit" />
          ) : !shouldAnimateLoading && mutation.isError ? (
            <ErrorMessage>{mutation.error.message}</ErrorMessage>
          ) : null}
        </FormSection>
      </FormBody>
    </Form>
  );
}
