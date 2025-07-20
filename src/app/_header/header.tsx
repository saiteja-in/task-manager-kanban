import Link from "next/link";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { KanbanSquareIcon, Loader2Icon, LogOut, Table } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { MenuButton } from "./menu-button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";

export async function Header() {
  const user = await getCurrentUser();
  return (
    <div className="border-b py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-2xl font-bold text-primary dark:text-primary-dark transition-transform duration-300 transform hover:scale-105 focus:scale-105">
  TaskTrackr
</div>


          <div className="flex items-center gap-2">
            {user && (
              <Button
                variant={"link"}
                asChild
                className="hidden md:flex items-center justify-center gap-2 hover:text-dark"
              >
                <Link href={"/table"} className="text-xl text-light">
                  <Table className="h-5 w-5" /> Table
                </Link>
              </Button>
            )}
            {user && (
              <Button
                variant={"link"}
                asChild
                className="hidden md:flex items-center justify-center gap-2 hover:text-dark"
              >
                <Link href={"/kanban"} className="text-xl text-light">
                  <KanbanSquareIcon className="h-5 w-5" /> Kanban
                </Link>
              </Button>
            )}
          </div>
          
        </div>

        <div className="flex items-center justify-between gap-5">
          <Suspense
            fallback={
              <div className="flex w-40 items-center justify-center">
                <Loader2Icon className="h-4 w-4 animate-spin" />
              </div>
            }
          >
            <HeaderActions />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function ProfileAvatar({ user }: { user: any }) {
  if (!user) return null; 
  
  return (
    <Avatar>
      <AvatarImage src={user.image || "/next.svg"} />
      <AvatarFallback>
        {user.name?.substring(0, 2).toUpperCase() ?? user.email?.substring(0, 2).toUpperCase() ?? "U"}
      </AvatarFallback>
    </Avatar>
  );
}

async function HeaderActions() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  return (
    <>
      {isSignedIn ? (
        <>
          {user && <a href="https://github.com/saiteja-in" target="_blank" rel="noopener noreferrer"><GitHubLogoIcon className="h-7 w-7" /></a>}  
          <div className=" hidden md:block">
            <ModeToggle />
          </div>
          <ProfileDropdown user={user} />
          <div className="md:hidden">
            <MenuButton />
          </div>
        </>
      ) : (
        <>
          <ModeToggle />

          <Button asChild variant="secondary">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </>
      )}
    </>
  );
}
async function ProfileDropdown({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Suspense
          fallback={
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-800">
              ..
            </div>
          }
        >
          <ProfileAvatar user={user} />
        </Suspense>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="space-y-2">
        <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link className="flex items-center" href={"/api/auth/signout"}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
