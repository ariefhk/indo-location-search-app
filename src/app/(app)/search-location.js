"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/tailwind-utils";
import { useGetAllProvince } from "@/actions/province";
import { useState } from "react";
import { useGetRegencyByProvinceId } from "@/actions/regency";
import { useGetDistrictByRegencyId } from "@/actions/district";

export default function SearchLocation() {
  const [isOpenProvince, setIsOpenProvince] = useState(false);
  const [provinceSearch, setProvinceSearch] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const { data: provinces, isLoading: isLoadingGetProvinces, isSuccess: isSuccessGetProvinces } = useGetAllProvince();

  const [isOpenRegency, setIsOpenRegency] = useState(false);
  const [regencySearch, setRegencySearch] = useState("");
  const [regencyId, setRegencyId] = useState("");
  const {
    data: regencies,
    isLoading: isLoadingGetRegencies,
    isSuccess: isSuccessGetRegencies,
  } = useGetRegencyByProvinceId(provinceId);

  const [isOpenDistrict, setIsOpenDistrict] = useState(false);
  const [districtSearch, setDistrictSearch] = useState("");
  const [districtId, setDistrictId] = useState("");
  const {
    data: districts,
    isLoading: isLoadingGetDistricts,
    isSuccess: isSuccessGetDistricts,
  } = useGetDistrictByRegencyId(regencyId);

  const handleOpenProvince = (state) => {
    //  if (isOpenProvince && consumptionId) {
    //    setConsumptionId("");
    //    setValue("consumption");
    //  }
    setIsOpenProvince(state);
  };

  const handleOpenRegency = (state) => {
    //  if (isOpenProvince && consumptionId) {
    //    setConsumptionId("");
    //    setValue("consumption");
    //  }
    setIsOpenRegency(state);
  };
  const handleOpenDistrict = (state) => {
    //  if (isOpenProvince && consumptionId) {
    //    setConsumptionId("");
    //    setValue("consumption");
    //  }
    setIsOpenDistrict(state);
  };

  const handleSelectProvince = (provId) => {
    if (provId !== provinceId) {
      setRegencyId("");
      setRegencySearch("");
      setDistrictId("");
      setDistrictSearch("");
    }
    setProvinceId(provId);
  };

  const handleSelectRegency = (regId) => {
    if (regId !== regencyId) {
      // setRegencyId("");
      setDistrictId("");
      setDistrictSearch("");
    }
    setRegencyId(regId);
  };
  const handleSelectDistrict = (disId) => {
    if (disId !== districtId) {
      // setRegencyId("");
    }
    setDistrictId(disId);
  };

  return (
    <div className=" max-w-screen-lg border rounded-lg overflow-hidden   w-full">
      <div className="grid grid-cols-7">
        <div className="col-span-4 space-y-5 p-5">
          <h1 className="font-bold text-2xl">Lokasi</h1>
          <div className="space-y-5">
            <Popover
              open={isOpenProvince}
              onOpenChange={(state) => {
                handleOpenProvince(state);
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-full justify-between", !provinceSearch && "text-muted-foreground")}
                >
                  {isSuccessGetProvinces && provinceSearch
                    ? provinces.find((comp) => comp.value === provinceSearch)?.label
                    : "Pilih Provinsi"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] md:w-[--radix-popover-trigger-width] md:max-h-[--radix-popover-content-available-height] p-0">
                <Command>
                  <CommandInput placeholder="Cari Konsumsi..." />
                  {isLoadingGetProvinces && (
                    <CommandList>
                      <CommandGroup>
                        {Array.from({ length: 1 }).map((_, index) => (
                          <CommandItem key={index + 1}>
                            <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> Sedang memuat data...
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                  {isSuccessGetProvinces && (
                    <CommandList>
                      <CommandEmpty>Provinsi tidak ditemukan!</CommandEmpty>
                      <CommandGroup>
                        {provinces.map((comp) => (
                          <CommandItem
                            value={comp.label}
                            key={comp.value}
                            className="overflow-x-auto"
                            onSelect={() => {
                              setProvinceSearch(comp?.value);
                              setIsOpenProvince(false);
                              handleSelectProvince(comp?.provinceId);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", comp.value === provinceSearch ? "opacity-100" : "opacity-0")} />

                            <span>{comp?.value}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                </Command>
              </PopoverContent>
            </Popover>

            <Popover
              open={isOpenRegency}
              onOpenChange={(state) => {
                handleOpenRegency(state);
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-full justify-between", !regencySearch && "text-muted-foreground")}
                >
                  {!regencySearch
                    ? "Pilih Kabupaten"
                    : regencySearch && isSuccessGetRegencies
                    ? regencies.find((comp) => comp.value === regencySearch)?.label
                    : "Pilih Kabupaten"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] md:w-[--radix-popover-trigger-width] md:max-h-[--radix-popover-content-available-height] p-0">
                <Command>
                  <CommandInput placeholder="Cari Kabupaten..." />
                  {isLoadingGetRegencies && (
                    <CommandList>
                      <CommandGroup>
                        {Array.from({ length: 1 }).map((_, index) => (
                          <CommandItem key={index + 1}>
                            <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> Sedang memuat data...
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                  {isSuccessGetRegencies && (
                    <CommandList>
                      <CommandEmpty>kabupaten tidak ditemukan!</CommandEmpty>
                      <CommandGroup>
                        {regencies.map((comp) => (
                          <CommandItem
                            value={comp.label}
                            key={comp.value}
                            className="overflow-x-auto"
                            onSelect={() => {
                              setRegencySearch(comp?.value);
                              setIsOpenRegency(false);
                              handleSelectRegency(comp?.regencyId);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", comp.value === regencySearch ? "opacity-100" : "opacity-0")} />

                            <span>{comp?.value}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                </Command>
              </PopoverContent>
            </Popover>

            <Popover
              open={isOpenDistrict}
              onOpenChange={(state) => {
                handleOpenDistrict(state);
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-full justify-between", !districtSearch && "text-muted-foreground")}
                >
                  {!districtSearch
                    ? "Pilih Kecamatan"
                    : districtSearch && isSuccessGetDistricts
                    ? districts.find((comp) => comp.value === districtSearch)?.label
                    : "Pilih Kecamatan"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] md:w-[--radix-popover-trigger-width] md:max-h-[--radix-popover-content-available-height] p-0">
                <Command>
                  <CommandInput placeholder="Cari Kecamatan..." />
                  {isLoadingGetDistricts && (
                    <CommandList>
                      <CommandGroup>
                        {Array.from({ length: 1 }).map((_, index) => (
                          <CommandItem key={index + 1}>
                            <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" /> Sedang memuat data...
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                  {isSuccessGetDistricts && (
                    <CommandList>
                      <CommandEmpty>Kecamatan tidak ditemukan!</CommandEmpty>
                      <CommandGroup>
                        {districts.map((comp) => (
                          <CommandItem
                            value={comp.label}
                            key={comp.value}
                            className="overflow-x-auto"
                            onSelect={() => {
                              setDistrictSearch(comp?.value);
                              setIsOpenDistrict(false);
                              handleSelectDistrict(comp?.districtId);
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", comp.value === districtSearch ? "opacity-100" : "opacity-0")} />

                            <span>{comp?.value}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="col-span-3 space-y-5  p-5">
          <h1 className="font-bold text-2xl">Data Lokasi</h1>
          <div className="space-y-5">
            <div>Id Provinsi : {provinceId}</div>
            <div>Id Kabupaten : {regencyId}</div>
            <div>Id Kecamatan : {districtId}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
