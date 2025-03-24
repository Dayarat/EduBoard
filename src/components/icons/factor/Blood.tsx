import { SvgIcon, SvgIconProps } from '@mui/material';

const Blood = (props: SvgIconProps) => {
  return (
    <SvgIcon width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
      <path
        d="M13.5 5.5C14.88 5.5 16 4.38 16 3S14.88 .5 13.5 .5 11 .62 11 2s1.12 3.5 2.5 3.5zm-1.79 5.07l-1.8 3.45 2.27 2.36v5.12h-2v-4l-2-2-1 2.5v3.5h-2v-4.5l1.75-3.88L8 9.5V6h7v2h-5v1.5l2.71 2.57 1.66-3.2 1.74.87-2.7 5.5-3.04-2.96z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default Blood;
