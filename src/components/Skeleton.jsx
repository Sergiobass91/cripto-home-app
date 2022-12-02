import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCoin = ( {count, width, height, duration} ) => {
  return (
    <SkeletonTheme baseColor="#293143" width={width} highlightColor="#778EC2" duration={duration} className="">
      <Skeleton count={count} height={height} />
    </SkeletonTheme>
  );
}

export default SkeletonCoin;
