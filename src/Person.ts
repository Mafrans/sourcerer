export class Person {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public toString(): string {
    return `${this.lastName}, ${this.firstName}`;
  }

  public static fromString(name: string): Person | undefined {
    let firstName: string, lastName: string;
    if (name.contains(",")) {
      [lastName, firstName] = name.split(", ");
    } else if (name.contains(" ")) {
      [firstName, lastName] = name.split(" ");
    } else {
      return;
    }

    return new Person(firstName, lastName);
  }

  public static fromObject(obj: any): Person {
    return new Person(obj.firstName, obj.lastName);
  }
}
