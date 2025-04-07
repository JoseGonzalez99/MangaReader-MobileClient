import * as yup from 'yup';

export const registerSchema = yup.object({
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

export type RegisterDTO = yup.InferType<typeof registerSchema>;
