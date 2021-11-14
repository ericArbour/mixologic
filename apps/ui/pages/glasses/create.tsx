import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import { CreateGlassDto } from '@mixologic/common';

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

const resolver = classValidatorResolver(CreateGlassDto);

export default function CreateGlass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const mutation = useMutation<Response, Error, CreateGlassDto>(
    (createGlassDto) => submitMutation(createGlassDto, 'glasses')
  );
  const { shouldAnimateLoading } = useAnimateLoading(mutation);

  const onSubmit = (createGlassDto: CreateGlassDto) =>
    mutation.mutate(createGlassDto);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Glass</FormHeader>
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
            <SuccessMessage label="Glass" />
          ) : !shouldAnimateLoading && mutation.isError ? (
            <ErrorMessage>{mutation.error.message}</ErrorMessage>
          ) : null}
        </FormSection>
      </FormBody>
    </Form>
  );
}
