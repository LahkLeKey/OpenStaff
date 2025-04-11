/**
 * MIT License
 * Copyright (c) 2025 OpenStaff
 * Source: https://github.com/LahkLeKey/OpenStaff
 */

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
