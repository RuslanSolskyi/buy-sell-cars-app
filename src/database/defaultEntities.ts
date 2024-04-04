import { Logger } from '@nestjs/common';

import { admin } from '../common/constants/admin.dto';
import { brandsAndModels } from '../common/constants/brands-and-models';
import { AdminService } from '../modules/admin/admin.service';
import { ModelsService } from '../modules/brand/models.service';

export async function createDefaultEntities(
  adminService: AdminService,
  modelsService: ModelsService,
): Promise<void> {
  try {
    await adminService.createAdmin(admin);
    new Logger().warn('ROOT ADMIN created.');
  } catch (e) {
    new Logger().warn('ROOT ADMIN creation failed.');
  }

  try {
    await modelsService.createBrandsAndModels(brandsAndModels);
    new Logger().warn('Brand and model created.');
  } catch (e) {
    new Logger().warn('Brand and model creation failed.');
  }
}
