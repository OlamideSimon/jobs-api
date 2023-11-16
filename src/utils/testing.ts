// async createResume(resume: Partial<Resume>): Promise<Resume> {
//     if (resume.resumeData instanceof Buffer) {
//       // Store binary data (file)
//       return this.resumeRepository.save(resume);
//     } else if (typeof resume.resumeText === 'string') {
//       // Store plain text data
//       const entity = this.resumeRepository.create({ resumeText: resume.resumeText });
//       return this.resumeRepository.save(entity);
//     } else {
//       throw new BadRequestException('Invalid resume data. Please provide either binary data or plain text.');
//     }
//   }
