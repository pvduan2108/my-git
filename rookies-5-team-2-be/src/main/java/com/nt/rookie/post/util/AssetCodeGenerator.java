package com.nt.rookie.post.util;

import com.nt.rookie.post.model.Asset;
import com.nt.rookie.post.model.Category;
import org.hibernate.HibernateException;
import org.hibernate.MappingException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.Type;

import java.io.Serializable;
import java.util.List;
import java.util.Properties;

public class AssetCodeGenerator implements IdentifierGenerator {
    private String prefix;
    @Override
    public void configure(Type type, Properties params, ServiceRegistry serviceRegistry) throws MappingException {
        IdentifierGenerator.super.configure(type, params, serviceRegistry);
    }

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {

        Asset asset = (Asset) obj;
        String query = "from Category c where c.categoryCode = '" +
                asset.getCategory().getCategoryCode() + "' order by c.categoryCode desc";
        List<Category> found = session.createQuery(query).setMaxResults(1).getResultList();
        Integer maxId = found.stream().map(c ->c.getMaxAssetCode()).findFirst().get();

        return asset.getCategory().getCategoryCode() +  String.format("%06d", (maxId+1));
    }
}
