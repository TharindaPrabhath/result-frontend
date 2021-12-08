import { Subject } from "../constants/exam";

export function isEmpty(string: string) {
  return string === null || string === undefined || string === "";
}

// generates an unique examine doc id as follows
// examineId: [index]-[name(lowercased without any whitespace)]
export function generateExamineId(index: string, name: string): string {
  return `${index}-${getPureString(name)}`;
}

// generates an unique subject id as follows
// subject codes ->
//      physics               - phy
//      chemistry             - chem
//      biology               - bio
//      combined mathematics  - com
//
// subjectId: [index]-[name(lowercased without any whitespace)]-[subjectCode]
export function generateSubjectId(
  index: string,
  name: string,
  subject: string
): string {
  return `${index}-${getPureString(name)}-${getSubjectCode(subject)}`;
}

function getSubjectCode(subject: string): string {
  switch (subject) {
    case Subject.PHYSICS:
      return "phy";

    case Subject.CHEMISTRY:
      return "chem";

    case Subject.BIOLOGY:
      return "bio";

    case Subject.COMBINED_MATHEMATICS:
      return "com";

    default:
      return "";
  }
}

// returns a lower cased string without any whitespace
export function getPureString(string: string): string {
  if (isEmpty(string)) return "";
  return string.trim().replace(/ /g, "").toLowerCase();
}
