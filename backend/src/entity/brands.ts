import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Marcas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 90 })
  nome: string;

  @Column({ type: "tinyint", width: 1, default: 1 })
  ativo: number;

  @Column({ type: "varchar", length: 20 })
  cadastrado: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  alterado: string | null;
}
