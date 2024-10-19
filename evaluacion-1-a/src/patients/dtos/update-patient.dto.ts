import { UploadedFile } from "express-fileupload";
import { Gender } from "../../interfaces";

export class UpdatePatientDto {
  private constructor(
    public rut?: string,
    public name?: string,
    public age?: number,
    public gender?: Gender,
    public disease?: string,
    public personal_photo?: UploadedFile,
  ) {}

  public static update(object: UpdatePatientDto): [string?, UpdatePatientDto?] {
    const { rut, name, age, gender, disease, personal_photo } =
      object;

    

    const rutRegex = /^[0-9]{7,8}-[0-9Kk]$/;
    if (personal_photo) {
      const extension = personal_photo?.mimetype.split("/")[1];
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
      if (!imageExtensions.includes(extension))
        return [
          "personal_photo is invalid format, must be jpg, jpeg, png, gif, bmp, webp",
        ];
    }

    if (rut && !rutRegex.test(rut)) return ["rut is invalid format XXXXXXXX-X"];
    if (name?.length === 0 && name?.trim().length < 3)
      return ["name is invalid, must be at least 3 characters"];
    if (age && age <= 0) return ["age is invalid, must be greater than 0"];
    if (gender && !Object.values(Gender).includes(gender))
      return ["gender is invalid, must be Masculino or Femenino"];
    if (disease?.length === 0 && disease?.trim().length < 3)
      return ["disease is invalid, must be at least 3 characters"];

    return [
      undefined,
      new UpdatePatientDto(
        rut,
        name?.trim(),
        age,
        gender,
        disease?.trim(),
        personal_photo,
      ),
    ];
  }
}