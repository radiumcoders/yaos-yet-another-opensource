"use client";

import { XIcon } from "lucide-react";
import React, {
  type ComponentProps,
  createContext,
  type MouseEventHandler,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type TagsContextType = {
  value?: string;
  setValue?: (value: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  width?: number;
  setWidth?: (width: number) => void;
  searchValue?: string;
  setSearchValue?: (value: string) => void;
};

const TagsContext = createContext<TagsContextType>({
  value: undefined,
  setValue: undefined,
  open: false,
  onOpenChange: () => {},
  width: undefined,
  setWidth: undefined,
  searchValue: undefined,
  setSearchValue: undefined,
});

const useTagsContext = () => {
  const context = useContext(TagsContext);

  if (!context) {
    throw new Error("useTagsContext must be used within a TagsProvider");
  }

  return context;
};

export type TagsProps = {
  value?: string;
  setValue?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  className?: string;
};

export const Tags = ({
  value,
  setValue,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  children,
  className,
}: TagsProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [width, setWidth] = useState<number>();
  const [searchValue, setSearchValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <TagsContext.Provider
      value={{ value, setValue, open, onOpenChange, width, setWidth, searchValue, setSearchValue }}
    >
      <Popover onOpenChange={onOpenChange} open={open}>
        <div className={cn("relative w-full", className)} ref={ref}>
          {children}
        </div>
      </Popover>
    </TagsContext.Provider>
  );
};

export type TagsTriggerProps = ComponentProps<typeof Button> & {
  maxVisibleTags?: number;
};

export const TagsTrigger = ({
  className,
  children,
  maxVisibleTags = 4,
  ...props
}: TagsTriggerProps) => {
  // Convert children to array and filter to get only valid React elements
  const childrenArray = React.Children.toArray(children);
  const tagValues = childrenArray.filter(
    (child) => React.isValidElement(child) && child.type === TagsValue
  );
  
  const totalTags = tagValues.length;
  const hasOverflow = totalTags > maxVisibleTags;
  const visibleTags = hasOverflow ? tagValues.slice(0, maxVisibleTags) : tagValues;
  const remainingCount = totalTags - maxVisibleTags;

  return (
    <PopoverTrigger render={<Button className={cn("h-10 min-h-10 w-full justify-between p-2", className)} role="combobox" variant="outline" {...props} />}>
      <div className="flex flex-wrap items-center gap-1 h-full overflow-y-auto overflow-x-hidden w-full scrollbar-hide">
        {totalTags > 0 ? (
          <>
            {visibleTags}
            {hasOverflow && remainingCount > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
                +{remainingCount} more
              </Badge>
            )}
          </>
        ) : (
          <span className="px-2 py-px text-muted-foreground">
            Select a tag...
          </span>
        )}
      </div>
    </PopoverTrigger>
  );
};

export type TagsValueProps = ComponentProps<typeof Badge>;

export const TagsValue = ({
  className,
  children,
  onRemove,
  ...props
}: TagsValueProps & { onRemove?: () => void }) => {
  const handleRemove: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onRemove?.();
  };

  return (
    <Badge className={cn("flex items-center gap-2", className)} {...props}>
      {children}
      {onRemove && (
        // biome-ignore lint/a11y/noStaticElementInteractions: "This is a clickable badge"
        // biome-ignore lint/a11y/useKeyWithClickEvents: "This is a clickable badge"
        <div
          className="size-auto cursor-pointer hover:text-muted-foreground"
          onClick={handleRemove}
        >
          <XIcon size={12} />
        </div>
      )}
    </Badge>
  );
};

export type TagsContentProps = ComponentProps<typeof PopoverContent>;

export const TagsContent = ({
  className,
  children,
  ...props
}: TagsContentProps) => {
  const { width } = useTagsContext();

  return (
    <PopoverContent
      className={cn("p-0", className)}
      style={{ width }}
      {...props}
    >
      <Command>{children}</Command>
    </PopoverContent>
  );
};

export type TagsInputProps = ComponentProps<typeof CommandInput>;

export const TagsInput = ({ className, ...props }: TagsInputProps) => {
  const { setSearchValue } = useTagsContext();

  return (
    <CommandInput
      className={cn("h-9", className)}
      onValueChange={(value) => setSearchValue?.(value)}
      {...props}
    />
  );
};

export type TagsListProps = ComponentProps<typeof CommandList>;

export const TagsList = ({ className, ...props }: TagsListProps) => (
  <CommandList className={cn("max-h-[200px]", className)} {...props} />
);

export type TagsEmptyProps = ComponentProps<typeof CommandEmpty> & {
  onCreateTag?: (tag: string) => void;
};

export const TagsEmpty = ({
  children,
  className,
  onCreateTag,
  ...props
}: TagsEmptyProps) => {
  const { searchValue } = useTagsContext();

  if (onCreateTag && searchValue && searchValue.trim()) {
    return (
      <CommandEmpty className="py-2 px-2" {...props}>
        <Button
          variant="ghost"
          className="w-full justify-start text-sm"
          onClick={() => onCreateTag(searchValue.trim())}
        >
          <span className="text-muted-foreground">Create tag:</span>
          <span className="ml-2 font-semibold">{searchValue.trim()}</span>
        </Button>
      </CommandEmpty>
    );
  }

  return (
    <CommandEmpty {...props}>{children ?? "No tags found."}</CommandEmpty>
  );
};

export type TagsGroupProps = ComponentProps<typeof CommandGroup>;

export const TagsGroup = CommandGroup;

export type TagsItemProps = ComponentProps<typeof CommandItem>;

export const TagsItem = ({ className, ...props }: TagsItemProps) => (
  <CommandItem
    className={cn("cursor-pointer items-center justify-between", className)}
    {...props}
  />
);
