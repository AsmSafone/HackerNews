export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  currentTime?: string;
}