import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
interface SkeletonProps {
  count?: number;
  width?: string | number;
  height?: string | number;
}
const SkeletonGlobal = (props: SkeletonProps) => (
  <SkeletonTheme {...props}>
    <p>
      <Skeleton count={props.count} />
    </p>
  </SkeletonTheme>
)

export default SkeletonGlobal;
