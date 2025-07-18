import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Calendar, User, Mail, Phone, Tag, Loader, Check, ChevronLeft, Building, Hash, FileText } from 'lucide-react';

const SchemeSubmission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    // Provider-specific fields
    governmentTAN: '',  // For Government (Tax Deduction and Collection Account Number)
    ifscCode: '',       // For Bank
    gstNumber: '',      // For Corporate
    // ---
    organizationName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    deadline: '',
    description: '',
    eligibility: '',
    benefits: '',
    documents: '',
    applicationProcess: '',
    website: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Base classes for form inputs for consistency
  const inputBaseClasses = "block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-green-500 focus:border-green-500";
  const inputIconClasses = "pl-10 pr-3";
  const inputErrorClasses = "border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500";


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
        const newFormData = { ...prev, [name]: value };
        // If the provider is changed, reset the specific fields and their errors
        if (name === 'provider') {
            newFormData.gstNumber = '';
            newFormData.governmentTAN = '';
            newFormData.ifscCode = '';

            setErrors(currentErrors => {
                const { gstNumber, governmentTAN, ifscCode, ...rest } = currentErrors;
                return rest;
            });
        }
        return newFormData;
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.title.trim()) newErrors.title = 'Scheme title is required';
    if (!formData.provider) newErrors.provider = 'Provider type is required';
    if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    if (!formData.deadline.trim()) newErrors.deadline = 'Deadline is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.eligibility.trim()) newErrors.eligibility = 'Eligibility criteria is required';
    if (!formData.benefits.trim()) newErrors.benefits = 'Benefits is required';

    // Email validation
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    // Website validation (if provided)
    if (formData.website && !/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    // --- Semi-Authentication Validation ---
    switch (formData.provider) {
        case 'government':
            if (!formData.governmentTAN.trim()) {
                newErrors.governmentTAN = 'TAN is required for government providers.';
            } else if (!/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/.test(formData.governmentTAN.toUpperCase())) {
                newErrors.governmentTAN = 'Please enter a valid 10-character TAN (e.g., ABCD12345E).';
            }
            break;
        case 'bank':
            if (!formData.ifscCode.trim()) {
                newErrors.ifscCode = 'IFSC code is required for bank providers.';
            } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
                newErrors.ifscCode = 'Please enter a valid 11-character IFSC code.';
            }
            break;
        case 'corporate':
            if (!formData.gstNumber.trim()) {
                newErrors.gstNumber = 'GST Number is required for corporate providers.';
            } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber.toUpperCase())) {
                newErrors.gstNumber = 'Please enter a valid 15-character GST number.';
            }
            break;
        default:
            break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0] || Object.keys(validateForm())[0];
      if (firstErrorKey) {
        const element = document.getElementsByName(firstErrorKey)[0];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting Form Data:", formData);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting scheme:', error);
      setErrors({
        form: 'There was an error submitting your scheme. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Scheme Submitted Successfully</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Thank you for submitting your agricultural scheme. Our team will review your submission.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/schemes')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back to Schemes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderProviderSpecificField = () => {
    switch(formData.provider) {
        case 'government':
            return (
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                    <label htmlFor="governmentTAN" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                    Department TAN *
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FileText className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" name="governmentTAN" id="governmentTAN" value={formData.governmentTAN} onChange={handleInputChange} className={`${inputBaseClasses} ${inputIconClasses} ${errors.governmentTAN ? inputErrorClasses : ''}`} placeholder="Enter the 10-character TAN" />
                        {errors.governmentTAN && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.governmentTAN}</p>}
                    </div>
                </div>
            );
        case 'bank':
            return (
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                    <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                    Bank Branch IFSC *
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Hash className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" name="ifscCode" id="ifscCode" value={formData.ifscCode} onChange={handleInputChange} className={`${inputBaseClasses} ${inputIconClasses} ${errors.ifscCode ? inputErrorClasses : ''}`} placeholder="Enter the 11-digit IFSC code" />
                        {errors.ifscCode && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.ifscCode}</p>}
                    </div>
                </div>
            );
        case 'corporate':
            return (
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                    <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                    GST Number *
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" name="gstNumber" id="gstNumber" value={formData.gstNumber} onChange={handleInputChange} className={`${inputBaseClasses} ${inputIconClasses} ${errors.gstNumber ? inputErrorClasses : ''}`} placeholder="Enter the 15-character GSTIN" />
                        {errors.gstNumber && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.gstNumber}</p>}
                    </div>
                </div>
            );
        default:
            return null;
    }
  };


  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate('/schemes')}
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Schemes
        </button>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Submit a New Scheme</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Share agricultural schemes or subsidies with our farming community.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* ... (rest of the component is the same, only the form fields below are changed) */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
            {/* ... */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label htmlFor="provider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                  Provider Type *
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="provider"
                    name="provider"
                    value={formData.provider}
                    onChange={handleInputChange}
                    className={`${inputBaseClasses} ${errors.provider ? inputErrorClasses : ''}`}
                  >
                    <option value="">Select type</option>
                    <option value="government">Government</option>
                    <option value="bank">Bank</option>
                    <option value="corporate">Corporate</option>
                  </select>
                  {errors.provider && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.provider}</p>}
                </div>
            </div>
              
            {/* --- RENDER PROVIDER-SPECIFIC FIELD --- */}
            {renderProviderSpecificField()}

            {/* ... (The rest of the form fields remain the same) */}
        </form>
      </div>
    </div>
  );
};

export default SchemeSubmission;