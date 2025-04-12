import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiPython, SiR } from "react-icons/si";

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div>
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger id="language-select" className="w-3xs">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="python">
            <SiPython className="text-[#3776AB]" />
            Python
          </SelectItem>
          <SelectItem value="r">
            <SiR className="text-[#276DC3]" />R
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
