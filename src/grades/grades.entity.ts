import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Grades extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lotNumber: string;

  @Column()
  overallCarScore: string;

  @Column()
  overallCarGrade: string;

  @Column()
  regradedCarGrade: string;

  @Column()
  sectionMaxGrade: string;

  @Column()
  sectionConfig: string;

  @Column()
  config: string;

  @Column()
  gradeLetters: string;

  @Column()
  allFactors: string;

  @Column()
  sectionFactors: string;

  @Column()
  grader: string;
}
