import { SvgIcon, SvgIconProps } from '@mui/material';

const Tier = (props: SvgIconProps) => {
  return (
    <SvgIcon width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13h-1v6l4.25 2.52.75-1.23-3.5-2.08V7z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default Tier;
