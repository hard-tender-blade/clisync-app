"use client";
import MOB from "@/app/components/mob";
import PC from "@/app/components/pc";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  workspacePagesBottom,
  workspacePagesMobile,
  workspacePagesTop,
} from "./workspacePages";
import { usePathname, useRouter } from "next/navigation";
import logOut from "@/modules/client/query/auth/logOut";
import { IoLogOut } from "react-icons/io5";
import { queryClient } from "@/modules/client/queryClient";
import { User } from "@/modules/shared/types/mainTypes";
import { getUser } from "@/modules/client/query/user/useUser";
import { MdOutlineWorkspacePremium } from "react-icons/md";

export default function WorkspaceSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    queryClient.invalidateQueries();
    router.replace("/");
  };

  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await getUser());
    };

    fetchUser();
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <PC className="min-h-screen w-16 border-r border-solid border-base-200 p-2">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-2">
            {workspacePagesTop.map((page) => (
              <button
                key={page.path}
                className={`btn tooltip tooltip-right relative z-50 ${page.path === pathname && "btn-primary"}`}
                data-tip={page.label}
                onClick={() => {
                  router.push(page.path);
                }}
              >
                {page.icon}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <button
              className={`btn tooltip tooltip-right relative z-50 ${user?.premiumPlanTo && new Date(user.premiumPlanTo) > new Date() && "btn-primary"}`}
              data-tip={
                user?.premiumPlanTo && new Date(user.premiumPlanTo) > new Date()
                  ? `Premium plan active until ${new Date(user.premiumPlanTo).toLocaleDateString()}`
                  : "Upgrade to premium"
              }
              onClick={() => {
                // if dont have sub
                if (
                  !user?.premiumPlanTo ||
                  new Date(user.premiumPlanTo) < new Date()
                ) {
                  router.push("/#pricing");
                }
                // if ()
                // user?.premiumPlanTo && new Date(user.premiumPlanTo) > new Date()
                //   ? `Premium plan active until ${new Date(user.premiumPlanTo).toLocaleDateString()}`
                //   : "Upgrade to premium";
                // window.location.href = "/"
              }}
            >
              <MdOutlineWorkspacePremium className="h-4 w-4" />
            </button>
            {workspacePagesBottom.map((page, i) => (
              <button
                key={page.path}
                className={`btn tooltip tooltip-right relative z-50 ${page.path === pathname && "btn-primary"}`}
                data-tip={page.label}
                onClick={() => {
                  router.push(page.path);
                }}
              >
                {page.icon}
              </button>
            ))}
            <button
              key={"/"}
              className={`btn tooltip tooltip-right relative z-50`}
              data-tip={"Logout"}
              onClick={handleLogout}
            >
              <IoLogOut />
            </button>
          </div>

          {/* <ThemeSwitch /> */}
        </div>
      </PC>

      <div className="no-scrollbar h-screen w-full overflow-y-scroll">
        {children}
      </div>

      <MOB>
        <div className="h-16 w-full bg-red"></div>
        <div className="btm-nav z-[300]">
          {workspacePagesMobile.map((page, i) => (
            <Link
              key={page.path}
              href={page.path}
              className={`${page.path === pathname && "active text-primary"}`}
            >
              {page.icon}
            </Link>
          ))}
        </div>
      </MOB>
    </div>
  );
}
