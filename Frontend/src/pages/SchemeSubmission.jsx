import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Calendar, User, Mail, Phone, Tag, Loader, Check, ChevronLeft } from 'lucide-react';

const SchemeSubmission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementsByName(firstErrorField)[0];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
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
            Thank you for submitting your agricultural scheme. Our team will review your submission and get in touch if we need more information.
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
          Share agricultural schemes, subsidies, or events with our farming community.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-900">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Review Process</h3>
              <div className="mt-2 text-sm text-green-700 dark:text-green-200">
                <p>
                  All submissions are reviewed by our team before being published to ensure accuracy and relevance for our community.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
          {errors.form && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 text-red-700 dark:text-red-300">
              {errors.form}
            </div>
          )}

          {/* Scheme Information */}
          <div className="space-y-6 pt-8 sm:pt-10 sm:space-y-5">
            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Scheme Information</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This information will be displayed publicly.</p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                  Scheme Title *
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`${inputBaseClasses} ${errors.title ? inputErrorClasses : ''}`}
                  />
                  {errors.title && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                </div>
              </div>

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
                    <option value="event">Event</option>
                  </select>
                  {errors.provider && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.provider}</p>}
                </div>
              </div>
              
              {/* Other fields updated with the new structure */}

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                  Organization Name *
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input type="text" name="organizationName" id="organizationName" value={formData.organizationName} onChange={handleInputChange} className={`${inputBaseClasses} ${errors.organizationName ? inputErrorClasses : ''}`} />
                  {errors.organizationName && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.organizationName}</p>}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                  Application Deadline *
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="date" name="deadline" id="deadline" value={formData.deadline} onChange={handleInputChange} className={`${inputBaseClasses} ${inputIconClasses} ${errors.deadline ? inputErrorClasses : ''}`} />
                  {errors.deadline && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.deadline}</p>}
                </div>
              </div>
              
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                  Description *
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleInputChange} className={`${inputBaseClasses} ${errors.description ? inputErrorClasses : ''}`} placeholder="Provide a detailed description of the scheme." />
                  {errors.description && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                  Eligibility Criteria *
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea id="eligibility" name="eligibility" rows={3} value={formData.eligibility} onChange={handleInputChange} className={`${inputBaseClasses} ${errors.eligibility ? inputErrorClasses : ''}`} placeholder="Who is eligible to apply?" />
                  {errors.eligibility && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.eligibility}</p>}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                  Benefits *
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea id="benefits" name="benefits" rows={3} value={formData.benefits} onChange={handleInputChange} className={`${inputBaseClasses} ${errors.benefits ? inputErrorClasses : ''}`} placeholder="What benefits will farmers receive?" />
                  {errors.benefits && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.benefits}</p>}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                  Official Website
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input type="text" name="website" id="website" value={formData.website} onChange={handleInputChange} className={`${inputBaseClasses} ${errors.website ? inputErrorClasses : ''}`} placeholder="https://example.com" />
                  {errors.website && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.website}</p>}
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                  Tags
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleInputChange} className={`${inputBaseClasses}`} placeholder="e.g., irrigation, loans, training"/>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Enter tags separated by commas.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 pt-8 sm:pt-10 sm:space-y-5">
            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Contact Information</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Provide contact details for verification purposes. This will not be shared publicly.</p>
            </div>
            <div className="space-y-6 sm:space-y-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                    Contact Person *
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" name="contactName" id="contactName" value={formData.contactName} onChange={handleInputChange} className={`${inputBaseClasses} ${inputIconClasses} ${errors.contactName ? inputErrorClasses : ''}`} />
                        {errors.contactName && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.contactName}</p>}
                    </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                    Email *
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="email" name="contactEmail" id="contactEmail" value={formData.contactEmail} onChange={handleInputChange} className={`${inputBaseClasses} ${inputIconClasses} ${errors.contactEmail ? inputErrorClasses : ''}`} />
                        {errors.contactEmail && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.contactEmail}</p>}
                    </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 dark:sm:border-gray-700 sm:pt-5">
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2">
                    Phone
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="tel" name="contactPhone" id="contactPhone" value={formData.contactPhone} onChange={handleInputChange} className={`${inputBaseClasses} ${inputIconClasses}`} />
                    </div>
                </div>
            </div>
          </div>
          
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/schemes')}
                className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Scheme'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchemeSubmission;