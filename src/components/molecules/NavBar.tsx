"use client";

import React from "react";

const imgVector =
  "http://localhost:3845/assets/86fa93c8f8ec0bde2eae7635e0b56ab772cc32b6.svg";
const img =
  "http://localhost:3845/assets/5106cbe612ebc3b785ff65d31c27923f3388cc20.svg";

interface IconChevronProps {
  orientation?: "down" | "up";
}

function IconChevron({ orientation = "up" }: IconChevronProps) {
  if (orientation === "down") {
    return (
      <div
        className="relative size-full"
        data-name="Icon chevron"
        data-node-id="434:2682"
      >
        <div
          className="absolute h-2 left-px top-px w-3.5"
          data-name="Vector"
          data-node-id="393:1770"
        >
          <img alt="" className="block max-w-none size-full" src={imgVector} />
        </div>
      </div>
    );
  }
  return null;
}

interface NavBarProps {
  items?: Array<{
    name: string;
    url: string;
    icon?: React.ComponentType;
  }>;
  inline?: boolean;
  className?: string;
}

export function NavBar({ items, inline, className }: NavBarProps) {
  return (
    <div
      className="box-border content-stretch flex flex-col content-center h-full isolate items-center justify-center p-0 relative w-full"
      data-name="Menu 2"
      data-node-id="434:2598"
    >
      <div
        className="box-border content-stretch bg-[rgba(17,24,40,0.7)] rounded-[25px] flex flex-row items-center justify-start px-3 py-0 relative shrink-0 z-[2]"
        data-name="Primary menu"
        id="node-I434_2598-434_2001"
      >
        {/* Services Menu Item with Dropdown */}
        <div
          className="box-border content-stretch flex flex-row gap-1.5 items-center justify-center pl-6 pr-2 py-4 relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          data-name="Item"
          id="node-I434_2598-434_2002"
        >
          <div
            className="font-['Neulis_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
            id="node-I434_2598-434_2003"
          >
            <p className="block leading-[normal] whitespace-pre">Kompetencer</p>
          </div>
          <div
            className="h-2.5 overflow-clip relative shrink-0 w-4"
            data-name="Icon chevron"
            id="node-I434_2598-434_2682"
          >
            <IconChevron orientation="down" />
          </div>
        </div>

        {/* Other Menu Items */}
        <div
          className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          data-name="Item"
          id="node-I434_2598-434_2004"
        >
          <div
            className="font-['Neulis_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
            id="node-I434_2598-434_2005"
          >
            <p className="block leading-[normal] whitespace-pre">Services</p>
          </div>
        </div>

        <div
          className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          data-name="Item"
          id="node-I434_2598-434_2006"
        >
          <div
            className="font-['Neulis_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
            id="node-I434_2598-434_2007"
          >
            <p className="block leading-[normal] whitespace-pre">Resultater</p>
          </div>
        </div>

        <div
          className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-6 py-4 relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          data-name="Item"
          id="node-I434_2598-434_2008"
        >
          <div
            className="font-['Neulis_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
            id="node-I434_2598-434_2009"
          >
            <p className="block leading-[normal] whitespace-pre">Insights</p>
          </div>
        </div>

       

        {/* Icons Section */}
        <div
          className="box-border content-stretch flex flex-row items-center justify-start px-3 py-0 relative shrink-0"
          data-name="Icons"
          id="node-I434_2598-434_2182"
        >
          <div
            className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3.5 py-[13px] relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            data-name="Item"
            id="node-I434_2598-434_2183"
          >
            <div
              className="relative shrink-0 size-6"
              data-name="Icon"
              id="node-I434_2598-434_2184"
            >
              <div
                className="absolute left-[8.4px] size-[2.4px] top-[2.4px]"
                id="node-I434_2598-434_2184-91_981"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[4.8px] size-[2.4px] top-[3.6px]"
                id="node-I434_2598-434_2184-91_982"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-3 size-[2.4px] top-[3.6px]"
                id="node-I434_2598-434_2184-91_983"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[14.4px] size-[2.4px] top-[7.2px]"
                id="node-I434_2598-434_2184-91_984"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[2.4px] size-[2.4px] top-[10.8px]"
                id="node-I434_2598-434_2184-91_985"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[4.8px] size-[2.4px] top-[14.4px]"
                id="node-I434_2598-434_2184-91_986"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[8.4px] size-[2.4px] top-[15.6px]"
                id="node-I434_2598-434_2184-91_987"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[14.4px] size-[2.4px] top-[10.8px]"
                id="node-I434_2598-434_2184-91_988"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-3 size-[2.4px] top-[14.4px]"
                id="node-I434_2598-434_2184-91_989"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[2.4px] size-[2.4px] top-[7.2px]"
                id="node-I434_2598-434_2184-91_990"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[15.6px] size-[2.4px] top-[15.6px]"
                id="node-I434_2598-434_2184-91_991"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[18px] size-[2.4px] top-[18px]"
                id="node-I434_2598-434_2184-91_992"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
            </div>
          </div>

          <div
            className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3.5 py-[13px] relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            data-name="Item"
            id="node-I434_2598-434_2185"
          >
            <div
              className="relative shrink-0 size-6"
              data-name="Icon"
              id="node-I434_2598-434_2186"
            >
              <div
                className="absolute left-[10.8px] size-[2.4px] top-[10.8px]"
                id="node-I434_2598-434_2186-91_2206"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[10.8px] size-[2.4px] top-[4.8px]"
                id="node-I434_2598-434_2186-91_2216"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[10.8px] size-[2.4px] top-[16.8px]"
                id="node-I434_2598-434_2186-91_2221"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[14.4px] size-[2.4px] top-[10.8px]"
                id="node-I434_2598-434_2186-91_2207"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[14.4px] size-[2.4px] top-[4.8px]"
                id="node-I434_2598-434_2186-91_2217"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[14.4px] size-[2.4px] top-[16.8px]"
                id="node-I434_2598-434_2186-91_2222"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[18px] size-[2.4px] top-[10.8px]"
                id="node-I434_2598-434_2186-91_2215"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[18px] size-[2.4px] top-[4.8px]"
                id="node-I434_2598-434_2186-91_2218"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[18px] size-[2.4px] top-[16.8px]"
                id="node-I434_2598-434_2186-91_2223"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[3.6px] size-[2.4px] top-[10.8px]"
                id="node-I434_2598-434_2186-91_2209"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[3.6px] size-[2.4px] top-[4.8px]"
                id="node-I434_2598-434_2186-91_2219"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[3.6px] size-[2.4px] top-[16.8px]"
                id="node-I434_2598-434_2186-91_2224"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[7.2px] size-[2.4px] top-[10.8px]"
                id="node-I434_2598-434_2186-91_2214"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[7.2px] size-[2.4px] top-[4.8px]"
                id="node-I434_2598-434_2186-91_2220"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
              <div
                className="absolute left-[7.2px] size-[2.4px] top-[16.8px]"
                id="node-I434_2598-434_2186-91_2225"
              >
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background */}
    </div>
  );
}

export default NavBar;
