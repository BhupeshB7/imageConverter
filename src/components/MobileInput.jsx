import React, { useState, useEffect } from 'react';
const MobileInput = ({ phone, setPhone, countryCode, setCountryCode }) => {
  return (
    <div className="mt-3 mb-3">
      
      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 pb-1">
        Mobile Number
      </label>
      <div className='flex items-center justify-between gap-1 w-full'>
      <input
        type="tel"
        placeholder="+91"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        required
        className="w-20"
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-79"
      />
      </div>
    </div>
  );
};

export default MobileInput;
