export type TypeValidations = { [k: string]: { required: boolean; length: number } };

export function validationMessages<T>(validations: TypeValidations, object: { [k: string]: any }) {
  return Object.entries(validations).reduce((errors: { [k: string]: any }, [property, requirements]) => {
    errors[property] = []
    if (requirements.required) {
      const errorMessage = validateRequiredMessage(object[property])
      if (errorMessage) errors[property].push(errorMessage)
    }

    if (requirements.length) {
      const errorMessage = validateLengthMessage(object[property], requirements.length)
      if (errorMessage) errors[property].push(errorMessage)
    }

    return errors
  }, {})
}

export function checkErrors(errors: { [k: string]: any }) {
  let hasError = false;
  Object.entries(errors).forEach(([property, messages]) => {
    messages.forEach((message: string) => {
      hasError = true;
    });
  });
  return hasError;
}

export function printErrors(errors: { [k: string]: any }) {
  Object.entries(errors).forEach(([property, messages]) => {
    messages.forEach((message: string) => {
      console.error(`${property} ${message}`)
    })
  })
}

function validateLengthMessage(value: any, length: number) {
  if (value == null) return
  if (value.length >= length) return

  return `must be ${length} or more characters`
}

function validateRequiredMessage(value: any) {
  if (value) return
  return 'is required'
}