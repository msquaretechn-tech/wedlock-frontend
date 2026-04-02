import { Skeleton } from 'antd';

const ProfileCardSkeleton = () => {
  return (
    <div className="relative w-full md:w-[24rem] h-[33.1rem] rounded-[1.9rem]">
      {/* <Skeleton.Image active className="absolute h-full w-full rounded-2xl object-cover " /> */}
      <div className="relative p-5 text-white h-full space-y-[13.5rem] rounded-2xl bg-black bg-opacity-45">
        <div className="flex items-center justify-between">
          <Skeleton.Button  active size="small" shape="round" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton.Button active shape="round" className="h-10 w-24" />
          <div>
            <div className="flex items-center justify-between">
              <Skeleton.Input  active size="large" style={{ width: '150px' }} />
              <Skeleton.Input active size="small" style={{ width: '50px' }} />
            </div>
            <Skeleton.Input active size="small" style={{ width: '100px' }} />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton.Input active size="small" style={{ width: '100px' }} />
            <div className="flex items-center gap-2">
              <Skeleton.Input active size="small" style={{ width: '80px' }} />
            </div>
          </div>
          <Skeleton.Button active shape="round" className="w-32" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
