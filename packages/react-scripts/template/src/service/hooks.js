import { useState, useReducer, useEffect, useRef } from 'react';

export const useSetState = initState =>
  useReducer((state, newState) => ({ ...state, ...newState }), initState);

export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(
    () => {
      ref.current = value;
    },
    [value]
  ); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

// 这个可以拿出来公用。用于form表单的值的变化和清空
export function useForm(schema, data, pathname) {
  const [formData, setFormData] = useState(schema);

  const refresh = (record = []) =>
    setFormData(formData.map(item => ({ ...item, value: record[item.key] })));

  useEffect(
    () => {
      const formDataEmpty = formData.every(item => item.value === undefined);
      if (pathname.includes('/form')) {
        const id = pathname.split('/').pop();
        if (id === 'new') {
          refresh();
        } else {
          refresh(data.find(i => i.id === id));
        }
      } else if (!formDataEmpty) {
        refresh();
      }
    },
    [pathname]
  );
  return formData;
}
