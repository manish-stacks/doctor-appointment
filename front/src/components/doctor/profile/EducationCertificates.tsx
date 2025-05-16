"use client";
import { PlusCircle, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface Education {
  id: number;
  degree: string;
  institution: string;
  year: string;
}

export interface Certificate {
  id: number;
  name: string;
  year: string;
}

interface educationProps {
  educations: Education[];
  certificates: Certificate[];
  setEducations: (educations: Education[]) => void;
  setCertificates: (certificates: Certificate[]) => void;
}
export default function EducationCertificates({ educations, certificates, setEducations, setCertificates }: educationProps) {
  

  const addEducation = () => {
    const newId = educations.length > 0 ? Math.max(...educations.map(e => e.id)) + 1 : 1;
    setEducations([...educations, { id: newId, degree: '', institution: '', year: '' }]);
  };

  const addCertificate = () => {
    const newId = certificates.length > 0 ? Math.max(...certificates.map(c => c.id)) + 1 : 1;
    setCertificates([...certificates, { id: newId, name: '', year: '' }]);
  };

  const removeEducation = (id: number): void => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const removeCertificate = (id: number): void => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  const updateEducation = (id: number, field: keyof Education, value: string): void => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const updateCertificate = (id: number, field: keyof Certificate, value: string): void => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-lg my-5 shadow-md">
      <h2 className="text-lg font-normal text-blue-500 mb-10">Education And Certificate(Award Details)</h2>
      
      {/* Education Section */}
      <div className="mb-8">
        <p className="text-gray-700 mb-4">Add Education</p>
        
        {educations.map((education, index) => (
          <div key={education.id} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-1/3">
                <p className="text-sm text-gray-600 mb-2">Degree</p>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  placeholder="Enter degree"
                  className="w-full"
                />
              </div>
              
              <div className="w-full sm:w-1/3">
                <p className="text-sm text-gray-600 mb-2">College/Institute</p>
                <Input
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  placeholder="Enter college/institute"
                  className="w-full"
                />
              </div>
              
              <div className="w-full sm:w-1/3 relative">
                <p className="text-sm text-gray-600 mb-2">Year Of Completion</p>
                <div className="flex items-center">
                  <Input
                    value={education.year}
                    onChange={(e) => updateEducation(education.id, 'year', e.target.value)}
                    placeholder="Enter year"
                    className="w-full"
                  />
                  {index > 0 && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeEducation(education.id)}
                      className="ml-2 h-10 w-10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button
          variant="ghost"
          className="flex items-center text-blue-500 hover:text-blue-700 hover:bg-transparent p-0"
          onClick={addEducation}
        >
          <PlusCircle className="mr-1 h-5 w-5" />
          Add More
        </Button>
      </div>
      
      {/* Certificate Section */}
      <div className="mb-8">
        <div className="mb-6">
          {certificates.map((certificate, index) => (
            <div key={certificate.id} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-2/3">
                  <p className="text-sm text-gray-600 mb-2">Certificate</p>
                  <Input
                    value={certificate.name}
                    onChange={(e) => updateCertificate(certificate.id, 'name', e.target.value)}
                    placeholder="Enter certificate name"
                    className="w-full"
                  />
                </div>
                
                <div className="w-full sm:w-1/3 relative">
                  <p className="text-sm text-gray-600 mb-2">Year</p>
                  <div className="flex items-center">
                    <Input
                      value={certificate.year}
                      onChange={(e) => updateCertificate(certificate.id, 'year', e.target.value)}
                      placeholder="Enter year"
                      className="w-full"
                    />
                    {index > 0 && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeCertificate(certificate.id)}
                        className="ml-2 h-10 w-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="ghost" 
          className="flex items-center text-blue-500 hover:text-blue-700 hover:bg-transparent p-0"
          onClick={addCertificate}
        >
          <PlusCircle className="mr-1 h-5 w-5" />
          Add More
        </Button>
      </div>
      
      <div className="border-t border-gray-200 mt-6"></div>
    </div>
  );
}