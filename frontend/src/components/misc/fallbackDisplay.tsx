import { styled } from '@mui/material/styles';

const PlaceHolder = styled('p')({
  fontSize: '40px',
  fontWeight: 'bold',
});

export function FallbackDisplay({ text }: FallbackDisplayProps) {
  return <PlaceHolder>{text}</PlaceHolder>;
}

interface FallbackDisplayProps {
  text: string;
}
