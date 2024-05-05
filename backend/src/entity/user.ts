import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//Entidade Usuario
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  nome: string;

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "tinyint", width: 1, default: 1 })
  ativo: number;

  @Column({ type: "varchar" })
  permissoes: string;

  @Column({ type: "varchar", length: 20 })
  cadastrado: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  alterado: string;
}
