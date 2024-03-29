import { QueryInterface ,literal} from 'sequelize';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable('users', {
          id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true,
          },
          name: { type: 'varchar' },
          email: {
            type: 'string',
            allowNull: false,
            unique: true,
          },
          createdAt: {
            type: 'timestamp',
            defaultValue: literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            type: 'timestamp',
            defaultValue: literal('CURRENT_TIMESTAMP'),
          },
        });
        await queryInterface.createTable('movies', {
          id: {
            type:'integer',
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: 'string',
            allowNull: false,
          },
          description: {
            type: 'string',
            allowNull: false,
          },
          duration: {
            type: 'integer',
            allowNull: false,
          },
          createdAt: {
            type: 'timestamp',
            defaultValue: literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            type: 'timestamp',
            defaultValue: literal('CURRENT_TIMESTAMP'),
          },
        });
        await queryInterface.createTable('cinemas', {
          id: {
            type:'integer',
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: 'string',
            allowNull: false,
          },
          location: {
            type: 'string',
            allowNull: false,
          },
          createdAt: {
            type: 'timestamp',
            defaultValue: literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            type: 'timestamp',
            defaultValue: literal('CURRENT_TIMESTAMP'),
          },
        });
        await queryInterface.createTable('screens', {
          id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
          },
          cinemaId: {
            type: 'integer',
            allowNull: false,
            references: {
              model: 'cinemas',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          name: {
            type: 'string',
            allowNull: false,
          },
          capacity: {
            type: 'integer',
            allowNull:false
          },
          createdAt: {
            type: 'timestamp',
            defaultValue: literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            type: 'timestamp',
            defaultValue: literal('CURRENT_TIMESTAMP'),
          },
        })

    await queryInterface.createTable('prices', {
      id: {
        type: 'integer',
        autoIncrement: true,
        primaryKey: true,
      },
      cinemaId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: 'cinemas',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      categoryId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      price: {
        type:'integer',
        allowNull: false,
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    })

    await queryInterface.createTable('seats', {
      id: {
        type: 'integer',
        autoIncrement: true,
        primaryKey: true,
      },
      cinemaId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: 'cinemas',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      screenId: {
        type: 'integer',
        allowNull: false,
        references: {
          model: 'screens',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      row: {
        type: 'integer',
        allowNull: false,
      },
      seatNumber: {
        type: 'integer',
        allowNull: false,
      },
      status: {
        type: 'integer',
        allowNull: false,
        defaultValue: 'available',
      },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    });


 
        
    
    
    
    
    
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
