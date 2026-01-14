"use client";
import { useEffect, useState } from 'react';
import { decryptDoctorId } from '@/helpers/Helper';
import { useRouter } from 'next/navigation';

const DoctorProfilePage = () => {
  const router = useRouter();
  const { encryptedDoctorId } = router.query;

  const [doctorId, setDoctorId] = useState<string | null>(null);

  useEffect(() => {
    if (encryptedDoctorId) {
      const decryptedId = decryptDoctorId(String(encryptedDoctorId));
      setDoctorId(decryptedId);
    }
  }, [encryptedDoctorId]);

  if (!doctorId) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Doctor Profile</h1>
      <p>Doctor ID: {doctorId}</p>
      {/* Render the rest of the profile using the decrypted ID */}
    </div>
  );
};

export default DoctorProfilePage;
