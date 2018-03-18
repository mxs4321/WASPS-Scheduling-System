<?php
   function sanitizeAndValidate($dataInput, $sanitizeFilter = -1, $validateFilter = -1, $filterFlag = -1)
   {
      $dataInput = trim($dataInput);

      if ($sanitizeFilter != -1)
      {
         $dataInput = filter_var($dataInput, $sanitizeFilter);
      }

      if ($validateFilter != -1)
      {
         if ($filterFlag != -1)
         {
            $dataInput = filter_var($dataInput, $validateFilter, $filterFlag);
         }
         else
         {
            $dataInput = filter_var($dataInput, $validateFilter);
         }
      }

      return $dataInput;
   }