import { useAppSelector } from "@redux/hooks";

const usePermission = (key: string) => {
  const user = useAppSelector((state) => state.user);
  const permission = user.profile.permission;
  return {
    canPost: permission.POST && permission.POST.indexOf(key) !== -1,
    canUpdate: permission.PATCH && permission.PATCH.indexOf(key) !== -1,
    canDelete: permission.DELETE && permission.DELETE.indexOf(key) !== -1,
  };
};

export default usePermission;
