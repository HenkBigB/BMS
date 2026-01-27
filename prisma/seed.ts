import { PrismaClient, type Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const attributeGroups: Array<{
  name: string;
  multiSelect: boolean;
  allowFreeText: boolean;
  values?: string[];
}> = [
  { name: 'Farbe', multiSelect: false, allowFreeText: false, values: ['weiß', 'schwarz', 'grau', 'silber', 'holz', 'sonstiges'] },
  { name: 'Dekor/Optik', multiSelect: false, allowFreeText: true },
  { name: 'Form/Bauart', multiSelect: false, allowFreeText: true, values: ['rechteckig', 'L-Form', 'mit Anbau', 'rund', 'modular', 'höhenverstellbar'] },
  { name: 'Größe/Abmessungsklasse', multiSelect: false, allowFreeText: true },
  { name: 'Hersteller/Serie', multiSelect: false, allowFreeText: true },
  { name: 'Material', multiSelect: false, allowFreeText: true, values: ['Holz', 'Metall', 'Glas', 'Kunststoff'] },
  { name: 'Besonderheit', multiSelect: true, allowFreeText: true, values: ['empfindlich', 'zerlegbar', 'nicht zerlegbar', 'abschließbar', 'schwer', 'sperrig'] }
];

const photoTypes = [
  'Gebäudeansicht',
  'Parkflächen/Ladezone',
  'Eingangsbereich',
  'Treppenhaus',
  'Aufzug',
  'Flur/Zugang',
  'Boden/Schutz nötig',
  'Sonstiges'
];

const roomTypes = ['Büro', 'Besprechung', 'Lager', 'Keller', 'Teeküche', 'Empfang', 'Serverraum', 'Flur', 'Sanitär', 'Sonstiges'];

const singleItemCategories = [
  { name: 'Tresor', critical: true },
  { name: 'Server Rack / IT Rack', critical: true },
  { name: 'Server (einzeln)', critical: true },
  { name: 'USV', critical: true },
  { name: 'großer Drucker / Plotter', critical: true },
  { name: 'Kühlschrank / großes Küchengerät', critical: true },
  { name: 'Empfangstresen (wenn groß/sperrig)', critical: true },
  { name: 'Konferenz-Tisch groß (wenn sperrig)', critical: true },
  { name: 'Kaffeemaschine (normal)', critical: false },
  { name: 'Mikrowelle', critical: false },
  { name: 'Monitor (einzeln)', critical: false },
  { name: 'PC (einzeln)', critical: false },
  { name: 'Sonstiges Gerät', critical: false }
];

const furnitureCatalog = [
  { name: 'Schreibtisch groß', unitVolumeCbm: 1.0, allowsDecimal: false },
  { name: 'Tisch', unitVolumeCbm: 0.8, allowsDecimal: false },
  { name: 'Tisch L-Form', unitVolumeCbm: 1.2, allowsDecimal: false },
  { name: 'Drehstuhl', unitVolumeCbm: 0.25, allowsDecimal: false },
  { name: 'Besucherstuhl', unitVolumeCbm: 0.2, allowsDecimal: false },
  { name: 'Rollcontainer', unitVolumeCbm: 0.35, allowsDecimal: false },
  { name: 'Standcontainer', unitVolumeCbm: 0.45, allowsDecimal: false },
  { name: 'Schrank 2-türig', unitVolumeCbm: 1.1, allowsDecimal: false },
  { name: 'Sideboard', unitVolumeCbm: 0.9, allowsDecimal: false },
  { name: 'Karton', unitVolumeCbm: 0.08, allowsDecimal: false },
  { name: 'Akten lfdm', unitVolumeCbm: 0.12, allowsDecimal: true },
  { name: 'Regal lfm', unitVolumeCbm: 0.2, allowsDecimal: true }
];

async function seedAttributeGroups() {
  for (const group of attributeGroups) {
    const created = await prisma.attributeGroup.create({
      data: {
        name: group.name,
        multiSelect: group.multiSelect,
        allowFreeText: group.allowFreeText
      }
    });

    if (group.values?.length) {
      await prisma.attributeValue.createMany({
        data: group.values.map((value) => ({
          groupId: created.id,
          value
        }))
      });
    }
  }
}

async function seedCatalog() {
  await prisma.furnitureType.createMany({ data: furnitureCatalog });
  await prisma.photoType.createMany({ data: photoTypes.map((name) => ({ name })) });
  await prisma.singleItemCategory.createMany({ data: singleItemCategories });
  await prisma.roomType.createMany({ data: roomTypes.map((name) => ({ name })) });
}

async function seedAdminUser() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@example.local',
      name: 'Admin',
      passwordHash,
      role: 'admin'
    }
  });
}

async function seedExampleProject() {
  const project = await prisma.project.create({
    data: {
      name: 'Demo Projekt Umzug',
      sites: {
        create: [
          {
            type: 'source',
            name: 'Quelle Standort',
            buildings: {
              create: [
                {
                  name: 'Haus A',
                  floors: {
                    create: [
                      {
                        label: 'EG',
                        rooms: {
                          create: [
                            { roomId: 'A.001', roomType: { connect: { name: 'Büro' } }, note: 'Serverraum rechts' },
                            { roomId: 'A.002', roomType: { connect: { name: 'Besprechung' } } }
                          ]
                        }
                      },
                      {
                        label: '1.OG',
                        rooms: {
                          create: [{ roomId: 'A.101', roomType: { connect: { name: 'Büro' } } }]
                        }
                      }
                    ]
                  }
                },
                {
                  name: 'Haus B',
                  floors: {
                    create: [
                      {
                        label: 'UG',
                        rooms: {
                          create: [{ roomId: 'B.UG1', roomType: { connect: { name: 'Lager' } } }]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            type: 'target',
            name: 'Ziel Standort',
            buildings: {
              create: [
                {
                  name: 'Neubau',
                  floors: {
                    create: [
                      {
                        label: 'EG',
                        rooms: {
                          create: [{ roomId: 'N.001', roomType: { connect: { name: 'Empfang' } } }]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });

  const furniture = await prisma.furnitureType.findFirst({ where: { name: 'Schreibtisch groß' } });
  const room = await prisma.room.findFirst({ where: { roomId: 'A.001' } });
  if (furniture && room) {
    const lineItem: Prisma.RoomLineItemCreateInput = {
      room: { connect: { id: room.id } },
      furnitureType: { connect: { id: furniture.id } },
      snapshotName: furniture.name,
      snapshotUnitVolume: furniture.unitVolumeCbm,
      quantity: 10,
      variantLabel: 'Standard'
    };

    await prisma.roomLineItem.create({ data: lineItem });
    await prisma.roomLineItem.create({
      data: {
        room: { connect: { id: room.id } },
        furnitureType: { connect: { id: furniture.id } },
        snapshotName: furniture.name,
        snapshotUnitVolume: 1.5,
        quantity: 1,
        variantLabel: 'Sondergröße 1.5 cbm'
      }
    });
  }

  const category = await prisma.singleItemCategory.findFirst({ where: { name: 'Tresor' } });
  if (category && room) {
    await prisma.singleItem.create({
      data: {
        room: { connect: { id: room.id } },
        category: { connect: { id: category.id } },
        label: 'Tresor 1',
        weightKg: 400,
        weightStatus: 'estimated',
        notes: 'Kritisch, Zugang über Treppe.'
      }
    });
  }

  await prisma.project.update({
    where: { id: project.id },
    data: { status: 'seeded' }
  });
}

async function main() {
  await seedAttributeGroups();
  await seedCatalog();
  await seedAdminUser();
  await seedExampleProject();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
