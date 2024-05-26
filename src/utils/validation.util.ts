import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsOldEnough(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isOldEnough',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!(value instanceof Date)) {
            return false;
          }
          const today = new Date();
          const thirteenYearsAgo = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
          return value <= thirteenYearsAgo;
        },
        defaultMessage(args: ValidationArguments) {
          return `User must be at least 13 years old`;
        },
      },
    });
  };
}
