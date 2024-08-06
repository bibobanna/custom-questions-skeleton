import React from "react";
import { LANGUAGE_VERSIONS } from "../constants";
import { Text, Menu, Button, View } from "@instructure/ui";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <View>
      <Text display="flex">Language:</Text> <br />
      <Menu
        placement="bottom"
        trigger={<Button>{language ? language : "Select Language"}</Button>}
        mountNode={() => document.getElementById("main")}
      >
        {languages.map(([lang, version]) => (
          <Menu.Item
            key={lang}
            onSelect={() => onSelect(lang)}
            isSelected={lang === language}
          >
            {lang} ({version})
          </Menu.Item>
        ))}
      </Menu>
    </View>
  );
};
export default LanguageSelector;
