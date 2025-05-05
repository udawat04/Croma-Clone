import React from "react";

const FilterSidebar = ({ filters, onFilterChange, pageType }) => {
  // Common filter options
  const priceOptions = [
    "Under ₹10,000",
    "₹10,000 - ₹20,000",
    "₹20,000 - ₹30,000",
    "Above ₹30,000",
  ];

  // Dynamic brand options based on the pageType
  const brandOptions = {
    mobile: ["samsung", "apple", "vivo", "realme", "xiaomi"],
    laptop: ["dell", "hp", "lenovo", "acer", "asus"],
    tv: ["samsung", "lg", "sony", "panasonic"],
    appliance: ["whirlpool", "lg", "samsung", "godrej"],
    accessory: ["apple", "logitech", "jbl", "sennheiser"],
  };

  // Laptop-specific filter options
  const ramOptions = ["4GB", "6GB", "8GB", "12GB"]; // Adjusted for your data
  const storageOptions = ["256GB SSD", "512GB SSD", "1TB SSD"]; // Adjusted for your data

  // Mobile-specific filter options
  const mobileRamOptions = ["4GB", "6GB", "8GB"]; // RAM in GB
  const mobileStorageOptions = ["64GB", "128GB", "256GB"]; // Storage in GB, not SSD

  // TV-specific filter options
  const displaySizeOptions = ["32 inch", "43 inch", "55 inch"];
  const resolutionOptions = ["HD", "Full HD", "4K"];

  // Appliance-specific filter options
  const capacityOptions = ["200L", "300L", "500L"];
  const applianceTypeOptions = ["Refrigerator", "Washing Machine"];

  // Accessory-specific filter options
  const accessoryTypeOptions = ["Headphones", "Charger", "Keyboard"];
  const connectivityOptions = ["Wired", "Wireless"];

  const handleCheckboxChange = (group, option) => {
    const updated = filters[group].includes(option)
      ? filters[group].filter((item) => item !== option)
      : [...filters[group], option];

    onFilterChange(group, updated);
  };

  const renderCheckboxGroup = (title, groupName, options) => (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {options.map((option) => (
        <label key={option} className="block text-sm">
          <input
            type="checkbox"
            checked={filters[groupName].includes(option)}
            onChange={() => handleCheckboxChange(groupName, option)}
            className="mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  );

  return (
    <aside className="bg-white p-4 rounded shadow-md w-full lg:w-64">
      {/* Common Filters */}
      {renderCheckboxGroup("Price", "price", priceOptions)}

      {/* Dynamic Brand Filters based on pageType */}
      {pageType &&
        renderCheckboxGroup("Brand", "brand", brandOptions[pageType])}

      {/* Mobile-specific filters */}
      {pageType === "mobile" &&
        renderCheckboxGroup("RAM", "ram", mobileRamOptions)}
      {pageType === "mobile" &&
        renderCheckboxGroup("Storage", "storage", mobileStorageOptions)}

      {/* TV-specific filters */}
      {pageType === "tv" &&
        renderCheckboxGroup("Display Size", "displaySize", displaySizeOptions)}
      {pageType === "tv" &&
        renderCheckboxGroup("Resolution", "resolution", resolutionOptions)}

      {/* Appliance-specific filters */}
      {pageType === "appliance" &&
        renderCheckboxGroup("Capacity", "capacity", capacityOptions)}
      {pageType === "appliance" &&
        renderCheckboxGroup(
          "Appliance Type",
          "applianceType",
          applianceTypeOptions
        )}

      {/* Accessory-specific filters */}
      {pageType === "accessory" &&
        renderCheckboxGroup(
          "Accessory Type",
          "accessoryType",
          accessoryTypeOptions
        )}
      {pageType === "accessory" &&
        renderCheckboxGroup(
          "Connectivity",
          "connectivity",
          connectivityOptions
        )}

      {/* Laptop-specific filters */}
      {pageType === "laptop" && renderCheckboxGroup("RAM", "ram", ramOptions)}
      {pageType === "laptop" &&
        renderCheckboxGroup("Storage", "storage", storageOptions)}
    </aside>
  );
};

export default FilterSidebar;
