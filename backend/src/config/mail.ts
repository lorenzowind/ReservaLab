interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'lorenzomart01@gmail.com',
      name: 'Suporte Alocação de Laboratórios FMM',
    },
  },
} as IMailConfig;
