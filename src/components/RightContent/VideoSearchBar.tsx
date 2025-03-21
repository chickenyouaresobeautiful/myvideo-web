import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input } from 'antd';
import React, { useRef } from 'react';

export interface VideoSearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export const VideoSearchBar: React.FC<VideoSearchBarProps> = ({
  placeholder = '搜索',
  onSearch,
}) => {
  const inputRef = useRef<InputRef>(null);

  const handleSearch = (value: string) => {
    console.log('搜索:', value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: 500,
        height: 40,
        border: '1px solid #ccc',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
    >
      <Input
        ref={inputRef}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 'none',
          padding: '0 12px',
          height: '100%',
          fontSize: 16,
        }}
        onPressEnter={(e) => {
          handleSearch(e.currentTarget.value);
        }}
      />
      <div
        style={{
          width: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8f8f8',
          borderLeft: '1px solid #ccc',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (inputRef.current) {
            const value = inputRef.current.input.value;
            handleSearch(value);
          }
        }}
      >
        <SearchOutlined style={{ fontSize: 18 }} />
      </div>
    </div>
  );
};
