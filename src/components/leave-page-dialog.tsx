import Link from "next/link";
import { ReactNode } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export function LeavePageDialog({
  link,
  children,
}: {
  link: string;
  children: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="cursor-pointer text-destructive">{children}</span>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <div className="text-2xl">You are about to leave this app.</div>
        <Separator />
        <div className="flex flex-col gap-8">
          <span>
            The link you've clicked on will lead you to the following website:
            <span className="break-all font-bold">{link}</span>
          </span>
          <span>We are just verifying with you that you want to continue.</span>
          <Link
            target="_blank"
            rel="noopener noreferrer nofollow external"
            href={link}
          >
            <Button className="w-fit">Open Link</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
