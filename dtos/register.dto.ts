import * as yup from 'yup';

export const registerSchema = yup.object({
  fullName: yup.string().required('El nombre completo es obligatorio'),
  photoUrl: yup.string().url().required('Selecciona una imagen de perfil'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
});

export type RegisterDTO = yup.InferType<typeof registerSchema>;
