import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div
      className={`animate-pulse bg-white/5 border border-white/5 ${className}`}
      {...props}
    />
  );
};
export default Skeleton;
