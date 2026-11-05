import { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

type Item = NonNullable<TabsProps["items"]>[number] & {
  // Plain-text label for the mobile dropdown when `label` is not a string (e.g. has a badge)
  mobileLabel?: string;
};

interface Props extends Omit<TabsProps, "items" | "renderTabBar"> {
  items: Item[];
}

const MOBILE_QUERY = "(max-width: 767px)";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isMobile;
};

// Antd Tabs on desktop; on mobile the tab bar becomes a dropdown so long tab lists don't need sideways scrolling
const ResponsiveTabs = ({ items, activeKey, onChange, ...rest }: Props) => {
  const isMobile = useIsMobile();

  return (
    <Tabs
      {...rest}
      activeKey={activeKey}
      onChange={onChange}
      items={items.map(({ mobileLabel, ...item }) => item)}
      renderTabBar={
        isMobile
          ? () => (
              <div className="mb-4">
                <select
                  value={activeKey}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007eaf]"
                  aria-label="Select section"
                >
                  {items.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.mobileLabel ?? (typeof item.label === "string" ? item.label : item.key)}
                    </option>
                  ))}
                </select>
              </div>
            )
          : undefined
      }
    />
  );
};

export default ResponsiveTabs;
