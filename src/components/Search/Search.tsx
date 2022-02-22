import React, {ChangeEvent, FC, useState} from 'react';
import Input from "../Input";
import {useDebounce} from "../../hooks/useDebounce";
import {useActions} from "../../hooks/useActions";

const Search: FC = () => {
  const [value, setValue] = useState<string>('');

  const { search } = useActions();

  const debouncedSearch = useDebounce(search, 1000)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    debouncedSearch(event.target.value)
  }

  return (
    <div>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Поиск по новостям"
      />
    </div>
  );
};

export default Search;
