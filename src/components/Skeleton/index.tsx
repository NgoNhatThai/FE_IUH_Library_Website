import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
interface SkeletonProps {
  count?: number;
  width?: string | number;
  height?: string | number;
  isLoading?: boolean;
}
const SkeletonGlobal = (props: SkeletonProps) => (
  <SkeletonTheme {...props}>
    <p>
      {props.isLoading && (
        <Skeleton
          count={props.count}
          width={props.width}
          height={props.height}
        />
      )}
    </p>
  </SkeletonTheme>
);

export default SkeletonGlobal;
