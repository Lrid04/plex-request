import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center min-h-svh min-w-svh">
      <Spinner size="lg" color="danger" label="Loading..." />
    </div>
  );
}
