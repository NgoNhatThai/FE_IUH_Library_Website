import Button from './Button';
import ExportIcon from '../Icons/ExportIcon';

interface Iprops {
  onClick: any;
  disabled?: boolean;
}

const ButtonExport = ({ onClick, disabled = false }: Iprops) => {
  return (
    <Button
      title="Export"
      disabled={disabled}
      handleOnclick={onClick}
      iconBefore={<ExportIcon />}
    />
  );
};

export default ButtonExport;
