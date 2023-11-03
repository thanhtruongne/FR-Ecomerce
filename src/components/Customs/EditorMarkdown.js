import React, {memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';


const  EditorMarkdown = ({label,value,setChangeValue,name,invalidFields,setInvalidFields}) => {
  return (
    <>
      {label && <span className='form-label'>{label}</span>}
      <Editor
        apiKey='33yzr3g1sq782satbwj43211cyi3rv597vjwqg26sfjq20k4'
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          color_map: [
            '000000', 'Black',
            '808080', 'Gray',
            'FFFFFF', 'White',
            'FF0000', 'Red',
            'FFFF00', 'Yellow',
            '008000', 'Green',
            '0000FF', 'Blue'
          ],
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={(e) => setChangeValue(prev => ({...prev,[name] : e.target.getContent()}))}
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some(item => item.name === name) && <span className='text-danger'>{invalidFields?.find(item => item.name === name)?.message}</span>}
    </>
  );
}

export default memo(EditorMarkdown)
