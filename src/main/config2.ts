// import bcrypt from 'bcrypt';
// import { execSync } from 'child_process';

// const ALLOWED_PROCESSOR_ID = 'BFEBFBFF000906EA'; 
// const SALT_ROUNDS = 10;


// export function hashProcessorId(): string {
//   return bcrypt.hashSync(ALLOWED_PROCESSOR_ID, SALT_ROUNDS);
// }


// export function getProcessorId(): string {
//   try {
//     return execSync('wmic cpu get ProcessorId').toString().split('\n')[1].trim();
//   } catch (err) {
//     console.error('Error fetching Processor ID:', err);
//     return ''; 
//   }
// }


// export function isProcessorValid(): boolean {
//   const currentProcessorId = getProcessorId(); 
//   if (!currentProcessorId) {
//     console.error('No Processor ID detected.');
//     return false;
//   }

//   const allowedProcessorHash = hashProcessorId(); 
//   return bcrypt.compareSync(currentProcessorId, allowedProcessorHash); 
// }
