export interface Option {
  label: string;
  value: string;
}

export default function getTimesArray(): Option[] {
  return [
    {
      label: '1º Tempo',
      value: '1',
    },
    {
      label: '2º Tempo',
      value: '2',
    },
    {
      label: '3º Tempo',
      value: '3',
    },
    {
      label: '4º Tempo',
      value: '4',
    },
    {
      label: '5º Tempo',
      value: '5',
    },
    {
      label: '6º Tempo',
      value: '6',
    },
    {
      label: '7º Tempo',
      value: '7',
    },
    {
      label: '8º Tempo',
      value: '8',
    },
    {
      label: 'Atendimento',
      value: 'extra',
    },
  ];
}
